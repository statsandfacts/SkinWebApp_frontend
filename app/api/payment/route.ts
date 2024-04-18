import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const data = req.body;
  if (!data) {
    return NextResponse.json({
      error: 'Please provide all the required fields',
    });
  }

  const { receipt } = data;

  try {
    const instance = new Razorpay({
      key_secret: process.env.NEXT_ROZERPAY_SECRET!,
      key_id: process.env.NEXT_ROZERPAY_KEY!,
    });

    const options = {
      amount: 250 * 100, // amount in smallest currency unit
      currency: 'INR',
      receipt: receipt,
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return NextResponse.json({
        error: 'Some error occured1',
      });
    }
    const rozerpayKey = process.env.NEXT_ROZERPAY_KEY;
    return NextResponse.json({ ...order, rozerpayKey });
  } catch (error) {
    return NextResponse.json({
      error: 'Some error occured2',
    });
  }
}
