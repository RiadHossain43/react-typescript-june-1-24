import React, { useEffect } from "react";
import { Comment, Post } from "../../../types";
import CommentUI from "./Comment";
import { usePost } from "./store/post";
import { useUser } from "./store/user";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Avatar from "../../../components/Avatar";
import Skeleton from "../../../components/Skeleton";
import CommentSkeleton from "./CommentSkeleton";

const PostUI: React.FC<Post> = ({
  title,
  body,
  id,
  userId,
}): React.ReactElement => {
  const { commentUtils } = usePost();
  const { userUtils } = useUser();
  useEffect(() => {
    userUtils.getUser(userId);
  }, [userId]);
  const [commentsRef] = useAutoAnimate();
  return (
    <React.Fragment>
      <article className="mb-4 mx-3 break-inside p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border">
        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <Avatar src="https://randomuser.me/api/portraits/men/9.jpg" />
            <div className="flex flex-col">
              <div className="flex items-center">
                <a
                  data-testid={"post-user-name"}
                  className="inline-block text-lg font-bold mr-2"
                  href="/"
                >
                  {userUtils.isUserLoading ? (
                    <span data-testid={"post-user-skeleton"}>
                      <Skeleton width={150} />
                    </span>
                  ) : (
                    <span>{userUtils?.user?.name}</span>
                  )}
                </a>
                <span className="text-slate-500 dark:text-slate-300">
                  25 minutes ago
                </span>
              </div>
              <div className="text-slate-500 dark:text-slate-300">
                General Electric
              </div>
            </div>
          </div>
        </div>
        <h2 data-testid={"post-title"} className="text-3xl font-extrabold">
          {title}
        </h2>
        <div className="py-4">
          <p data-testid={"post-body"}>{body}</p>
        </div>
        <div className="py-4">
          <a className="inline-flex items-center" href="/">
            <span className="mr-2">
              <svg
                className="fill-rose-600 dark:fill-rose-400"
                style={{
                  width: 24,
                  height: 24,
                }}
                viewBox="0 0 24 24"
              >
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"></path>
              </svg>
            </span>
            <span className="text-lg font-bold">34</span>
          </a>
        </div>
        <div className="relative">
          <input
            className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 dark:bg-slate-600 rounded-lg placeholder:text-slate-600 dark:placeholder:text-slate-300 font-medium pr-20"
            type="text"
            placeholder="Write a comment"
          />
          <span className="flex absolute right-3 top-2/4 -mt-3 items-center">
            <svg
              className="mr-2"
              style={{
                width: 26,
                height: 26,
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5M17,9.5C17,10.3 16.3,11 15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5M12,17.23C10.25,17.23 8.71,16.5 7.81,15.42L9.23,14C9.68,14.72 10.75,15.23 12,15.23C13.25,15.23 14.32,14.72 14.77,14L16.19,15.42C15.29,16.5 13.75,17.23 12,17.23Z"
              ></path>
            </svg>
            <svg
              className="fill-blue-500 dark:fill-slate-50"
              style={{
                width: 24,
                height: 24,
              }}
              viewBox="0 0 24 24"
            >
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"></path>
            </svg>
          </span>
        </div>
        <div ref={commentsRef} className="pt-6">
          {commentUtils.comments.map((comment: Comment) => {
            return <CommentUI key={String(comment.id)} {...comment} />;
          })}
          {commentUtils.isCommentsLoading &&
            [1, 2].map((_) => <CommentSkeleton key={_} />)}
          <div className="w-full">
            <button
              onClick={() => commentUtils.listComments("postId=" + String(id))}
              className="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
            >
              Show comments
            </button>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
};

export default PostUI;
