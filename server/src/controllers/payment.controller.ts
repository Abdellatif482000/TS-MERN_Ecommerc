// import { Request, Response } from "express";
// import axios from "axios";
// import qs from "qs";

// const CLIENT_ID =
//   "Af1oqCibmTLeHIlKzJtTofCTswxwcVW0aE0gYqpE9MpMTqhSNo7ty_rSnnbDFRYyyT5wgenZHbvKx939";
// const CLIENT_SECRET =
//   "EIKCKCSpVBTg56jeyjbRPZvDh60MK6ddUl89Fq9JQppLan-c1bhqCUKgcpNzIclu4_yMI9y2xdSp4ZgL";

// // let resData: any;
// const getPaypalToken = async () => {
//   try {
//     const paypalRes = await axios.post(
//       "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//       qs.stringify({ grant_type: "client_credentials" }),
//       {
//         headers: {
//           Authorization:
//             "Basic " +
//             Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//           // "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );
//     // console.log(paypalRes.data.access_token);
//     return paypalRes.data.access_token;
//   } catch (err) {
//     if (axios.isCancel(err)) {
//       console.log("Fetch canceled");
//     }
//     console.error("Error fetching data:", err);
//   }
// };

// export const reqPaypalToken = async (req: Request, res: Response) => {
//   try {
//     await axios
//       .post(
//         "https://api-m.sandbox.paypal.com/v1/oauth2/token",
//         qs.stringify({ grant_type: "client_credentials" }),
//         {
//           headers: {
//             Authorization:
//               "Basic " +
//               Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64"),
//             // "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       )
//       .then((paypalRes) => {
//         res.status(200).send({ data: paypalRes.data });
//       });
//   } catch (err) {
//     if (axios.isCancel(err)) {
//       console.log("Fetch canceled");
//     }
//     console.error("Error fetching data:", err);
//   }
// };

// export const paypalCreateOrder = async (req: Request, res: Response) => {
//   getPaypalToken().then((tok) => {
//     try {
//       axios
//         .post(
//           "https://api-m.sandbox.paypal.com/v2/checkout/orders",
//           JSON.stringify({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 reference_id: "d9f80740-38f0-11e8-b467-0ed5f89f718b",
//                 amount: { currency_code: "USD", value: "100.00" },
//               },
//             ],
//           }),
//           {
//             headers: {
//               Authorization: `Bearer ${tok}`,
//               "Content-Type": "application/json",
//               //   "PayPal-Request-Id": "7b92603e-77ed-4896-8e78-5dea2050476a",
//             },
//           }
//         )
//         .then((paypalRes) => {
//           console.log(paypalRes);
//           res.status(200).send({ data: paypalRes.data });
//         });
//     } catch (err) {
//       if (axios.isCancel(err)) {
//         console.log("Fetch canceled");
//       }
//       console.error("Error fetching data:", err);
//     }
//   });
// };

// export const paypalIdentity = async (req: Request, res: Response) => {
//   getPaypalToken().then((tok) => {
//     try {
//       axios
//         .post(
//           "https://api-m.sandbox.paypal.com/v2/scim/Users",
//           JSON.stringify({
//             schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
//             userName: "sydneyml531",
//             name: JSON.stringify({
//               givenName: "Sydney",
//               familyName: "McLaughlin",
//             }),
//             emails: JSON.stringify([
//               { value: "sydneyml@shop.com", primary: true },
//             ]),
//           }),
//           {
//             headers: {
//               Authorization: `Bearer ${tok}`,
//               "Content-Type": "application/scim+json",
//             },
//           }
//         )
//         .then((paypalRes) => {
//           console.log(paypalRes);
//           res.status(200).send({ data: paypalRes.data });
//         });
//     } catch (err) {
//       if (axios.isCancel(err)) {
//         console.log("Fetch canceled");
//       }
//       console.error("Error fetching data:", err);
//       res.status(400).send({ err: err });
//     }
//   });
// };
