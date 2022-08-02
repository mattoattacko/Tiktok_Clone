import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import { IUser } from "../types";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

//this interface declares how the comment itself will look
//the '?' means that this is optional.
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {/* loop over the comments data. If the comments exist, return them. Else return NoResults */}
        {comments?.length ? (
          comments.map((item, idx) => (
            <>
              {/* map over all the users, and for each we check which comments have been posted. So has the user posted this specific comment. We can look for the '_id' or the '_ref' */}
              {allUsers.map(
                (user: IUser) =>
                  user._id === (item.postedBy._id || item.postedBy._ref) && (
                    <div className="p-2 items-center" key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8">
                            <Image
                              src={user.image}
                              alt="user profile"
                              width={34}
                              height={34}
                              className="rounded-full"
                              layout="responsive"
                            />
                          </div>

                          {/* User Name */}
                          <div className="hidden xl:block">
                            {/* 'xl:block' will make sure the user images show on smaller screens */}
                            <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                              {user.userName.replaceAll(" ", "")}{" "}
                              {/* reaplaceAll(' ', '') will replace spaces with no space */}
                              <GoVerified className="text-blue-400" />
                            </p>
                            <p className="capitalize text-gray-400 text-xs">
                              {user.userName}
                            </p>
                          </div>
                        </div>
                      </Link>

                      {/* Comment Messages */}
                      <div>
                        <p>
                          {item.comment}
                        </p>
                      </div>



                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text="Be the first to comment!" />
        )}
      </div>

      {/* if the userProfile exists, then we show the comment form */}
      {userProfile && (
        <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
          <form className="flex gap-4" onSubmit={addComment}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            {/* if currently posting a comment */}
            <button className="text-md text-gray-400" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
