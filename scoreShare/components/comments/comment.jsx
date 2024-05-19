import Image from "next/image";
import { FaReply, FaTrash } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import TimeAgo from "timeago-react";
import { VoteArrows } from "./vote-arrows";

export const Comment = ({
  info,
  setParentComment,
  setFocus,
  replies,
  getReplies,
  currentUser,
  setCommentId,
  handleDeleteComment,
}) => {
  return (
    <div>
      <div className="flex flex-wrap p-4 text-sm bg-white rounded-sm shadow-md animate-comment gap-x-4">
        <VoteArrows info={info}/>
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center flex-1 gap-x-2">
              <Image
                alt=""
                width={100}
                height={100}
                className="w-4 rounded-full"
                src={info.user.image}
              />
              <h1 className="font-bold">{info.user.name}</h1>
              <p className="text-muted-foreground">
                <TimeAgo datetime={info.createdAt} />
              </p>
            </div>
            <div className="flex items-center">
              <button
                className="flex items-center gap-x-2"
                onClick={() => {
                  setFocus();
                  setParentComment(info.id);
                }}
              >
                <FaReply color="rgb(79 70 229)" />
                <span>Reply</span>
              </button>
              {currentUser.id === info.userId && (
                <>
                  <Separator orientation="vertical" className="mx-2" />
                  <button
                    className="flex items-center w-min gap-x-2"
                    onClick={() => {
                      setFocus(info.content);
                      setCommentId(info.id);
                    }}
                  >
                    <FaEdit color="rgb(79 70 229)" />
                    <span>Edit</span>
                  </button>

                  <Separator orientation="vertical" className="mx-2" />
                  <button
                    className="flex items-center w-min gap-x-2"
                    onClick={() => {
                      handleDeleteComment(info.id);
                    }}
                  >
                    <FaTrash color="rgb(79 70 229)" />
                    <span>Delete</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            <p className="mb-2 text-balance">{info.content}</p>
          </div>
        </div>

        {replies.length > 0 && (
          <>
            <label
              htmlFor={`view-replies-${info.id}`}
              className="w-full cursor-pointer"
            >
              <Button className="float-right text-xs pointer-events-none whitespace-nowrap">
                View Replies ({replies.length})
              </Button>
            </label>
            <input
              type="checkbox"
              defaultChecked={false}
              className="hidden peer"
              id={`view-replies-${info.id}`}
            />
            <Separator className="my-2" />
            <div className="hidden w-full border-s-2 ms-5 comment-replies peer-checked:block">
              {replies.map((comment) => {
                const subReplies = getReplies(comment.id);
                return (
                  <Comment
                    key={comment.id}
                    info={comment}
                    replies={subReplies}
                    currentUser={currentUser}
                    getReplies={getReplies}
                    setParentComment={setParentComment}
                    setFocus={setFocus}
                    setCommentId={setCommentId}
                    handleDeleteComment={handleDeleteComment}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
