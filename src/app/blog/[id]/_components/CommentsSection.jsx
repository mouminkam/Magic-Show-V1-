"use client";

import { useState } from "react";
import Button from "../../../../components/Button";
import SocialMediaIcons from "../../../../components/SocialMediaIcons";
import axiosInstance from "../../../../api/config/axios";

/**
 * CommentsSection Component
 * Displays comments list and comment form; submits to POST /blog/posts/:postId/comments
 *
 * @param {Object} props
 * @param {Array} props.comments - Array of { id, author, date, content, replies? }
 * @param {string|number} props.postId - Blog post ID
 */
export default function CommentsSection({ comments = [], postId }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);
    try {
      const author_name = [formData.firstName, formData.lastName].filter(Boolean).join(" ") || formData.firstName || formData.lastName;
      const comment = formData.message || (formData.subject ? `${formData.subject}\n${formData.message || ""}`.trim() : "");
      const res = await axiosInstance.post(`/blog/posts/${postId}/comments`, {
        author_name: author_name || "Anonymous",
        author_email: formData.email,
        comment: comment || formData.subject || "(no message)",
      });
      if (res?.data?.success) {
        setSubmitSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setSubmitError(res?.data?.message || "Failed to post comment.");
      }
    } catch (err) {
      const msg = err.response?.data?.message ?? err.message ?? "Failed to post comment. Please try again.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="comment-sec lg:px-10 mt-16 lg:mt-12 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="w-full mx-auto">
          {/* Comment Header */}
          <div className="comment-header py-8 mb-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center ">
              {/* Social Share */}
              <div className="share-social flex  max-lg:flex max-lg:justify-between">
                <span className="text-2xl  text-gray-600 uppercase mr-4">
                  Share
                </span>
                <SocialMediaIcons variant="default" size="md" className="ml-2" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl text-center lg:text-3xl text-gray-600 uppercase mb-4 lg:mb-5 max-lg:mb-10">
            {comments.length} Comment{comments.length !== 1 ? "s" : ""}
          </h1>
          {/* Comments List */}
          <ul className="comments-list space-y-12 mb-16">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="comment-item border-b lg:px-20 border-gray-300 pb-12 last:border-b-0"
              >
                <div className="comment-info">
                  <div className="header flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 max-lg:items-center max-lg:justify-center max-lg:text-center max-lg:gap-10">
                    <div className="heading mb-4 lg:mb-0">
                      <h2 className="text-xl text-gray-700 uppercase mb-2">
                        {comment.author}
                      </h2>
                      <time className="time text-gray-500 text-sm uppercase tracking-wider">
                        {comment.date}
                      </time>
                    </div>
                  </div>
                  <div className="flex justify-between items-center max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:text-center max-lg:gap-10">
                    <p className="text-gray-500 text-lg leading-9 w-3/4 mb-4 max-lg:w-full">
                      {comment.content}
                    </p>
                    <div className="">
                      <Button
                        variant="secondary"
                        size="md"
                        className="lg:px-18"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                  {comment.replies?.length > 0 && (
                    <ul className="mt-8 ms-8 lg:ms-12 space-y-6 border-s-2 border-gray-200 ps-6">
                      {comment.replies.map((reply) => (
                        <li key={reply.id}>
                          <h3 className="text-lg text-gray-700 uppercase mb-1">{reply.author}</h3>
                          <time className="text-gray-500 text-sm uppercase tracking-wider">{reply.date}</time>
                          <p className="text-gray-500 mt-2">{reply.content}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
          {submitSuccess && (
            <p className="text-green-600 font-medium mb-4">Comment submitted. It will appear after approval.</p>
          )}
          {submitError && (
            <p className="text-red-600 font-medium mb-4">{submitError}</p>
          )}

          {/* Leave Comment Form */}
          <div className="leave-comment border-t lg:px-10 border-gray-300 pt-16 mt-16">
            <h2 className="text-2xl text-gray-700 uppercase tracking-widest mb-12 flex items-center gap-2">
              post a comment
            </h2>

            <form onSubmit={handleSubmit} className="comment-form">
              <div className="space-y-8">
                {/* Name Fields */}
                <div className="form-group grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="col">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-control w-full border-b border-gray-400 py-2 focus:border-gray-600 outline-none transition-colors duration-250"
                      placeholder="First name"
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-control w-full border-b border-gray-400 py-2 focus:border-gray-600 outline-none transition-colors duration-250"
                      placeholder="Last name"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control w-full border-b border-gray-400 py-2 focus:border-gray-600 outline-none transition-colors duration-250"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Subject Field */}
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-control w-full border-b border-gray-400 py-2 focus:border-gray-600 outline-none transition-colors duration-250"
                    placeholder="Subject"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control w-full border-b border-gray-400 py-2 focus:border-gray-600 outline-none transition-colors duration-250 resize-none"
                    placeholder="Your message"
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group flex justify-center my-10  ">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="secondary"
                    size="md"
                    className="uppercase "
                  >
                    {isSubmitting ? "Posting" : "post comment"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

