import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},{timestamps: true});

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

UserSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}
export const User = mongoose.model('User', UserSchema);
