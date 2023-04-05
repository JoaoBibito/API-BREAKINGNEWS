import {createService, findAllService} from "../services/news.service.js";

const create = async(req,res)=>{
  try{
    const{title,text,banner}=req.body;
    if(!title || !text || !banner){
      return res.status(400).send({message:"Submit all fields for registration"})
    }

    await createService({
      title,
      text,
      banner,
      user:"ObjectIdFake"
    })
  }
  catch(err){
    return res.status(500).send({message:err.message})
  }
res.send(201)
}

const findAll=async (req,res)=>{
  const news= await findAllService();
  if(news.length===0){
    return res.status(400).send({message:"There are no registered news"})
  }
  res.send(news)
}

export  {
  create,
  findAll
}