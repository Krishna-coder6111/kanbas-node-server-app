import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.json(courses);
  });

  app.get("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.json(course);
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.json(status);
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.json(status);
  });

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });
}
