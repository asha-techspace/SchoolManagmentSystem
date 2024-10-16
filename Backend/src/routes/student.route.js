import { Router } from "express";
import { verifyUser } from '../middlewares/verifyjwt.middileware.js'
import { addStudent, getStudents, updateStudent, deleteStudent ,   addLibraryEntry,
    updateLibraryEntry,
    deleteLibraryEntry,
    addFeesTransaction,
    updateFeesTransaction,
    deleteFeesEntry,
    updateFeesSection, getLibraryRecord, getStudent, getFeesTransactions} from '../controllers/student/studentController.js';

const router = Router();

router.route("/").post(addStudent);

router.route("/").get(getStudents);

router.route("/:studentId").get(getStudent);

//router.route("/:id").get(getStudents);

router.route("/:id").put(updateStudent);

router.route("/:id").delete(deleteStudent);


// router.post('/:studentId/library', addLibraryEntry);
// router.put('/:studentId/library/:entryId', updateLibraryEntry);
// router.delete('/:studentId/library/:entryId', deleteLibraryEntry);


// router.post('/:studentId/fees-history', addFeesTransaction);
// router.put('/:studentId/fees-history/:transactionId', updateFeesTransaction);
// router.delete('/:studentId/fees-history/:transactionId', deleteFeesTransaction);

router.route('/:studentId/library')
  .post(addLibraryEntry);

router.route('/:studentId/library/:transId')
  .put(updateLibraryEntry)
  .delete(deleteLibraryEntry);

router.route('/library/:studentId').get(getLibraryRecord)

// Fees History CRUD routes
router.route('/:studentId/fees-history')
  .post(addFeesTransaction);

router.route('/fees-history/:studentId')
  .get(getFeesTransactions);

router.route('/:studentId/fees-history/:transId')
  .put(updateFeesTransaction)
  .delete(deleteFeesEntry);

router.route('/:studentId/fees')
  .put(updateFeesSection);




export default router;