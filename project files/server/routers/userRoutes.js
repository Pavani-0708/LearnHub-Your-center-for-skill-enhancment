const express = require("express");
const multer = require("multer");
const path = require("path");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerController,
  loginController,
  postCourseController,
  getAllCoursesUserController,
  deleteCourseController,
  getAllCoursesController,
  enrolledCourseController,
  sendCourseContentController,
  completeSectionController,
  sendAllCoursesUserController,
} = require("../controllers/userControllers");

const router = express.Router();

// -------------------- MULTER SETUP --------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(new Error("Only .mp4 videos are allowed"));
    }
    cb(null, true);
  }
});

// -------------------- USER ROUTES --------------------

// ✅ Register route
router.post("/register", registerController);

// ✅ Login route
router.post("/login", loginController);

// ✅ Add course (Teacher only)
router.post(
  "/addcourse",
  authMiddleware,
  upload.array("S_content"),
  postCourseController
);

// ✅ Get all courses (Admin)
router.get("/getallcourses", getAllCoursesController);

// ✅ Get courses for logged-in teacher
router.get("/getallcoursesteacher", authMiddleware, getAllCoursesUserController);

// ✅ Delete a course (Teacher)
router.delete("/deletecourse/:courseid", authMiddleware, deleteCourseController);

// ✅ Enroll in a course (Student)
router.post("/enrolledcourse/:courseid", authMiddleware, enrolledCourseController);

// ✅ Get course content for student
router.get("/coursecontent/:courseid", authMiddleware, sendCourseContentController);

// ✅ Mark section as completed (Student)
router.post("/completemodule", authMiddleware, completeSectionController);

// ✅ Get all enrolled courses for student
router.get("/getallcoursesuser", authMiddleware, sendAllCoursesUserController);

module.exports = router;