import  express, { Request, Response }  from "express";
import { connectDB, prisma } from "./conflig/db";
import { tudo_list } from './type/user'
import {v4 as uuidv4} from 'uuid'
import { User } from "@prisma/client";
import { Blog } from "@prisma/client";



const app =express()
const PORT =3002

app.use(express.json())
let user:tudo_list[]=[]

connectDB()
// //get
// app.get('/api/git', async(req:Request,res:Response) => {
//     const users = await prisma.user.findMany()
//     return res.json(users)
// })
// app.post('/adduser',async  (req: Request, res: Response) => {
//     const newuser = req.body as User;
//     await prisma.user.create({
//         data: newuser
//     });
//     return res.json('user added');
// });

// app.put('/updateuser/:id', async (req: Request, res: Response) => {
// const {id} = req.params
// const user = req.body as User
// await prisma.user.update({
//     where: { id: id },
//     data: user
// })
// res.json('user updated')
// })

// app.delete('/deleteuser/:id', async (req: Request, res: Response) => {
//     const {id} = req.params
//     await prisma.user.delete({
//         where: { id:(id) }
//     })
//     res.json('user deleted')
// })
// Register
app.post('/Register',async  (req: Request, res: Response) => {
    const newuser = req.body as User;
    await prisma.user.create({
        data: newuser
    });
    return res.json('user added');
});

//get all users
app.get('/api/git', async(req:Request,res:Response) => {
    const users = await prisma.user.findMany()
    return res.json(users)
});
 
// app.delete('/deleteuser:id', async (req: Request, res: Response) => {
//     const {id} = req.params
//     await prisma.user.delete({
//         where: { id:(id) }
//     })
//     res.json('user deleted')
// })
app.post('/creat/blog',async  (req: Request, res: Response) => {
    const newuserr   = req.body as Blog;
    await prisma.blog.create({
        data:newuserr
    })
    return res.json('blog added');
});
app.get('/blog/git', async(req:Request,res:Response) => {
    const users = await prisma.blog.findMany()
    return res.json(users)
});
app.get('/userblogs/:id',async(req:Request,res:Response)=>{
    const {id} = req.params
    const userId = await prisma.blog.findMany({
        where: {
          user_id:id,
        },
        select: {
          title: true,
          creatdata: true,
          id: true,
          user: {
            select: {
              username: true,
              email: true,
            },
          },
        },
      });
      res.json(userId);
})
app.delete('/deleteuser/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    await prisma.blog.delete({
        where: { id:id }
    })
    res.json('user deleted')
})
// app.post('/api/login', async (req: Request, res: Response))
app.listen(PORT,() => {
    console.log(`server good ${PORT}`);
})