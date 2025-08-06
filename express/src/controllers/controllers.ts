import type { Request, Response } from "express";
import { getAuthorById } from "../services/services";

export async function getAuthor(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "Invalid author id" });
  }

  try {
    const author = await getAuthorById(id);
    if (!author) {
      return res.status(404).json({
        error: "Unable to locate author by that id",
      });
    }
    res.json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal service error" });
  }
}
