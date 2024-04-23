import * as dao from "./dao.js";

export default function ModuleRoutes(app) {
  app.get("/api/modules", async (req, res) => {
    const modules = await dao.findAllModules();
    res.json(modules);
  });

  app.get("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const module = await dao.findModuleById(moduleId);
    if (!module) {
      res.status(404).send("Module not found");
      return;
    }
    res.json(module);
  });

  app.put("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  });

  app.delete("/api/modules/:moduleId", async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.deleteModule(moduleId);
    res.json(status);
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const newModule = { ...req.body, courseId };
    const module = await dao.createModule(newModule);
    res.json(module);
  });

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    const { courseId } = req.params;
    const modules = await dao.findModulesByCourseId(courseId);
    res.json(modules);
  });
}
