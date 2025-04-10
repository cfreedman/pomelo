import { JSX } from "react";

export default function Calendar(): JSX.Element {
  return (
    <>
      <div className="flex w-[1300px]">
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Sunday</h3>
          <div></div>
        </div>
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Monday</h3>
          <div></div>
        </div>
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Tuesday</h3>
          <div></div>
        </div>
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Wednesday</h3>
          <div></div>
        </div>
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Thursday</h3>
          <div></div>
        </div>
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Friday</h3>
          <div></div>
        </div>
        <div className="flex flex-col grow h-[600px] items-center border-solid border-2 border-gray-100">
          <h3>Saturday</h3>
          <div></div>
        </div>
      </div>
    </>
  );
}
