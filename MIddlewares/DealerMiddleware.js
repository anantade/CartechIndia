


const checkRole = (req,res,next) => {
   const {role} = req.params;

   if (!role || role !=='DEALER') {
    return res.json({message : 'Role is not matching',role})
   }else{
    next()
   }
}

module.exports = {checkRole}