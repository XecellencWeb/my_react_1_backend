import {Router} from 'express'
import drafts from '../modules/gamesDraft.js'
const router = Router()
import { verifyAdmin  } from '.././utils/verifyUser.js'

router.get('/draft/:id/:token',verifyAdmin, async(req,res)=>{
  await drafts.findOne().where({id:req.params.id}).then(draft=>{
    res.status(200).json(draft).catch(err=>{
        res.status((err.status || 500)).json(err)
    })
  })
})

router.put('/draft/:id/:token',verifyAdmin, async(req,res)=>{
  try {
    
   const draft =  await drafts.updateOne({id: req.params.id},req.body)
   
    res.status(200).json(draft)
      
  } catch (err) {
    res.status((err.status || 500)).json(err)
  }
})

  
router.delete('/draft/:id/:token',verifyAdmin, async(req,res)=>{
  try {
     await drafts.deleteOne({id:req.params.id})

    res.status(200).json('Delete Successfull')
       
  } catch (err) {
    res.status((err.status || 500)).json(err)
  }
  })

router.post('/draft/:token',verifyAdmin,async(req,res)=>{
  try {
    const count =  await drafts.find({id:req.body.id}).count()
    if(count>0) return res.status(400).json('Id already exist')
    drafts.create({...req.body})
    res.status(200).json('Draft added')
  } catch (err) {
    res.status((err.status || 500)).json(err)
    }
})

export default router