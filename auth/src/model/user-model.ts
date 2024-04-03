import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

// interface to define the new user added properties
interface UserAttr{
    email:string,
    password:string
    username:string
}

// interface to describe the properties of usermodel
interface UserModel extends mongoose.Model<UserDoc> {
    build(attr:UserAttr):UserDoc
}


// Interface for userDocument
interface UserDoc extends mongoose.Document {
    email:string,
    password:string,
    username:string
}

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    }

},{timestamps:true});

userSchema.statics.build = (attr:UserAttr) => {
    return new User(attr);
} 


// hashing password
userSchema.pre('save', async function(this: UserDoc, next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});




const User = mongoose.model<UserDoc, UserModel>('user',userSchema);

export { User };