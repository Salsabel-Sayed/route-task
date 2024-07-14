import { connect } from "mongoose";





export const dbConnection = connect('mongodb://localhost:27017/usersManagement')
.then(() => console.log('Connected to MongoDB...'))