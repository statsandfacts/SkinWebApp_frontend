"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { createComment } from "@/services/api.digitalPrescription.service";
import { toast } from "react-toastify";
import { useAuthInfo } from "@/hooks/useAuthInfo";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import Loader from "@/components/Loader";
import { fetchComments } from "@/redux/slices/digitalPrescription/blog.slice";
import { CircularProgress } from "@nextui-org/react";

interface ManageCommentsProps {}

const ManageComments: React.FC<ManageCommentsProps> = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useAuthInfo();
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { comments } = useSelector((state: RootState) => state.blogs);

  const handleAddComment = () => {
    setLoading(true);
    createComment({
      blog_id: blogId,
      content: newComment,
      name: userDetails?.name || "Anonymous",
    })
      .then((response) => {
        setNewComment("");
        dispatch(fetchComments(blogId));
      })
      .catch((error) => {
        toast.error("Failed to add comment.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <div className="mb-4 min-h-[3rem]">
        {comments.loading ? (
          <div className="w-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : comments.errorMessage ? (
          <p className="p-10 md:px-40 text-red-500">{comments.errorMessage}</p>
        ) :(comments?.data && comments?.data.length > 0 )? (
          comments?.data.map((comment: any, index: number) => (
            <div
              key={index}
              className="p-4 mb-2 border rounded-lg bg-gray-50 flex flex-col md:flex-row md:justify-between items-start"
            >
              <p className="text-sm text-slate-600">{comment.content}</p>
              <div className="text-right flex flex-row gap-2 md:gap-0 md:flex-col text-xs min-w-max text-gray-500 ml-0 md:ml-4">
                <p>{comment.name || "Anonymous"}</p>
                <p>{dayjs(comment.date).format("MMM D, YYYY h:mm A")}</p>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <Textarea
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="rounded-lg"
        />
        <Button
          onClick={handleAddComment}
          className="rounded-lg"
          color="primary"
          isLoading={loading}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default ManageComments;
