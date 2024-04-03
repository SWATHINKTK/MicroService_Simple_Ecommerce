import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  console.log(req.cookies)
  res
    .status(200)
    .clearCookie("userToken")
    .json({
      success:true,
      message:'User Logged Out. '
    });
});

export { router as signoutRouter };
