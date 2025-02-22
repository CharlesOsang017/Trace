export const createIssue = async(req, res)=>{
  try {
    const {name, status, description} = req.body
    // if(!name || !)
  } catch (error) {
    console.log('error in create Issue controller', error.message)
    return res.status(500).json({message: error.message})
  }
}