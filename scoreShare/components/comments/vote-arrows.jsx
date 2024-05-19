import { createVote } from "@/actions/voteActions";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";

export const VoteArrows = ({ info }) => {
  const [rating_, setRating] = useState(info.rating);
  const [total_, setTotal] = useState(info.totalVotes);
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
    const result = await createVote(hasUserVoted?.id, info.id, value);
    if (result) setHasUserVoted(result);
  };

  const handleExisting = (value, setter) => {
    setRating(rating_ + value);
    setter(false);
    handleLikeChange(0);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center p-2 rounded bg-zinc-100 gap-y-2 w-min">
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
      <small>({total_})</small>
    </div>
  );
};
