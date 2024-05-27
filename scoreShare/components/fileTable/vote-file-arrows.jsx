import { createVoteInFile } from "@/actions/voteInFile";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

export const VoteFileArrows = ({ info }) => {
  const [rating_, setRating] = useState(info.rating || 0);
  const [total_, setTotal] = useState(info.totalVotes || 0);
  const [hasUserVoted, setHasUserVoted] = useState(info.hasUserVoted);
  const [isLike, setIsLike] = useState(hasUserVoted?.vote === 1);
  const [isDislike, setIsDislike] = useState(hasUserVoted?.vote === -1);

  const handleLike = () => {
    if (isDislike) {
      setIsDislike(false);
      setIsLike(true);
      setRating(rating_ + 2);
    } else {
      setIsLike(true);
      setRating(rating_ + 1);
    }
    handleLikeChange(1);
  };

  const handleDislike = () => {
    if (isLike) {
      setIsLike(false);
      setIsDislike(true);
      setRating(rating_ - 2);
    } else {
      setIsDislike(true);
      setRating(rating_ - 1);
    }
    handleLikeChange(-1);
  };

  const handleLikeChange = async (value) => {
    if (!hasUserVoted) setTotal(total_ + 1);
    const result = await createVoteInFile(hasUserVoted?.id, info.id, value);
    if (result) setHasUserVoted(result);
  };

  const handleExisting = (value, setter) => {
    setRating(rating_ + value);
    setter(false);
    handleLikeChange(0);
  };

  return (
    <div className={"pe-4 flex flex-col items-end"}>
      <div className="flex items-center justify-center p-2 rounded gap-x-4 bg-zinc-100 gap-y-2 w-min">
        {isLike ? (
          <button
            className="scale-125 text-emerald-500"
            onClick={() => handleExisting(-1, setIsLike)}
          >
            <AiFillLike />
          </button>
        ) : (
          <button onClick={handleLike}>
            <AiOutlineLike />
          </button>
        )}

        <span
          className={cn(
            " text-base font-bold ",
            rating_ > 0
              ? "text-emerald-500"
              : rating_ < 0
              ? "text-destructive"
              : "text-indigo-600"
          )}
        >
          {rating_}
        </span>

        {isDislike ? (
          <button
            className="scale-125 text-destructive"
            onClick={() => handleExisting(1, setIsDislike)}
          >
            <AiFillDislike />
          </button>
        ) : (
          <button onClick={() => handleDislike()}>
            <AiOutlineDislike />
          </button>
        )}
      </div>
    </div>
  );
};