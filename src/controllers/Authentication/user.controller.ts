import { Request, Response } from "express";
import { registerUser} from '../../services/Authentication/user.service';
import { RegisterRequest} from '../../Requests/Authentication/user.request';
import { BaseAPIResponse} from '../../utils/BaseAPIResponse.ts';

export const signup = async (req: Request, res: Response) => {
  // Validate request data
  const request = new RegisterRequest(req.body);
  const { valid, errors } = request.isValid();

  if (!valid) {
    return res
      .status(400)
      .json(BaseAPIResponse.error('Validation failed', errors));
  }

  try {
    // Register the user using the service
    const user = await registerUser(
      request.name,
      request.username,
      request.email,
      request.password
    );

    // Return success response
    return res
      .status(201)
      .json(BaseAPIResponse.success('User registered successfully', { id: user._id }));
  } catch (error: any) {
    // Handle errors from service (like duplicate email/username)
    return res
      .status(500)
      .json(BaseAPIResponse.error('Signup failed', [error.message]));
  }
};