import { client } from "@/libs/server/client";
import sendEmail from "@/libs/server/nodemailClient";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  console.log(user)
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: { ...user }, 
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    console.log(phone)
    
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.MS_SID,
    //   to: process.env.MY_PHONE_NUM!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message)
  } else if (email){
    // const message = await sendEmail(email, payload)
    // console.log(message)
  }
  
  return res.json({ ok: true });
}

export default withHandler("POST", handler);

// phone, email -> back -> user? -> token -- user #reandomNumber(userid)
// -> #reandomNumber(userid) ->SMS ---> phone#(Twilio API)
// -> another input to input the #reandomNumber(userid)
// -> token? -- log the user in
