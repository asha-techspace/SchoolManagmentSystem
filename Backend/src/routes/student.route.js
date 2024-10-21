import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import authorizeRoles from '../middlewares/roleMiddleware.js'
import {
  addStudent, getStudents, updateStudent, deleteStudent, addLibraryEntry,
  updateLibraryEntry, deleteLibraryEntry, addFeesTransaction, updateFeesTransaction,
  deleteFeesEntry, deleteFees,updateFeesSection, getLibraryRecord, getStudent, getFeesTransactions, addFees
} from '../controllers/student/studentController.js';

const router = Router();

// Student CRUD routes

router.route("/").post(verifyUser, authorizeRoles(['Admin','OfficeStaff']), addStudent);

router.route("/").get(verifyUser,authorizeRoles(['Admin','OfficeStaff','Librarian' ]), getStudents);

//add another route to give librarian only basic student info

router.route("/:studentId").get(verifyUser, getStudent);

router.route("/:id").put(verifyUser,authorizeRoles(['Admin','OfficeStaff']),updateStudent);

router.route("/:id").delete(verifyUser,authorizeRoles(['Admin','OfficeStaff']),deleteStudent);

// Library History CRUD routes

router.route('/library/:studentId')
  .post(verifyUser,authorizeRoles(['Admin','Librarian']),addLibraryEntry); //verifyUser,authorizeRoles(['Admin','Librarian']),

router.route('/:studentId/library/:transId')
  .put(verifyUser,authorizeRoles(['Admin','Librarian']),updateLibraryEntry)
  .delete(verifyUser,authorizeRoles(['Admin','Librarian']), deleteLibraryEntry);

router.route('/library/:studentId').get(verifyUser, getLibraryRecord)

// Fees History CRUD routes
router.route('/:studentId/fees-history')
  .post(verifyUser,authorizeRoles(['Admin','OfficeStaff']),addFeesTransaction);

router.route('/fees-history/:studentId')
  .get(verifyUser,authorizeRoles(['Admin','OfficeStaff']),getFeesTransactions);

router.route('/:studentId/fees-history/:transId')
  .put(verifyUser,authorizeRoles(['Admin','OfficeStaff']),updateFeesTransaction)
  .delete(verifyUser,authorizeRoles(['Admin','OfficeStaff']),deleteFeesEntry);

router.route('/:studentId/fees/:transId')
  .delete(verifyUser,authorizeRoles(['Admin','OfficeStaff']),deleteFees);

router.route('/:studentId/addfees')
  .put(verifyUser,authorizeRoles(['Admin','OfficeStaff']),updateFeesSection)
  .post(verifyUser,authorizeRoles(['Admin','OfficeStaff']),addFees);




export default router;