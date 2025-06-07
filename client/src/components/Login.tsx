import { JSX } from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";

export default function Login(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Get Started</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col items-start">
            <label htmlFor="name">Name</label>
            <Input id="name" placeholder="Enter your name here..." />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="password">Name</label>
            <Input id="password" placeholder="Enter your password here..." />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div>
          <Button>Submit</Button>
          <Button>Go Back</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
