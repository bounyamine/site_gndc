import { Router } from 'express';  
import {  
  getTeamMembers,  
  getTeamMemberById,  
  createTeamMember,  
  updateTeamMember,  
  deleteTeamMember  
} from '../controllers/team.controller';  

const router = Router();  

router.get('/', getTeamMembers);  
router.get('/:id', getTeamMemberById);  
router.post('/', createTeamMember);  
router.put('/:id', updateTeamMember);  
router.delete('/:id', deleteTeamMember);  

export default router;