import { AnswerRepo } from "@/lib/repos";
import { StudentObject, StudentReq } from "@/util/token-object";
import { Router } from "express";

const route = Router();
/**
 * todo (update,crate,delete) Answer
 */

route.get("/get/:id", StudentObject, (req, res) => {
  try {
    const data = AnswerRepo.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.post("/submit-answer", StudentObject, (req: StudentReq, res) => {
  try {
    const { ans, states, q } = req.body;
    if (!ans || !states || !q)
      return res.status(403).json({
        message: "Input required Answers Status and question ID",
      });
    const data = AnswerRepo.save(
      AnswerRepo.create({
        ans,
        states,
        q,
        AnsBy: req.StudentObject,
      })
    );
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.put("/update-answer/:id", StudentObject, (req: StudentReq, res) => {
  try {
    const { ans, states, q } = req.body;
    const data = AnswerRepo.update(req.params.id, {
      ans,
      states,
      q,
    });
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
route.delete("/delete-answer/:id", StudentObject, (req: StudentReq, res) => {
  try {
    const data = AnswerRepo.delete(req.params.id);
    return res.json({ data });
  } catch (e) {
    return res.status(500).json({
      message: e.toString(),
    });
  }
});
export default route;