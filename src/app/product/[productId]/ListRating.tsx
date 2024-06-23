"use client";
import React from "react";
import Heading from "../../../../components/Heading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Rating } from "@mui/material";
import { ProductCardProps } from "../../../../components/products/ProductCard";

const ListRating: React.FC<ProductCardProps> = ({ product }) => {
  console.log(product);
  if (!product.reviews || product.reviews?.length === 0) return null;
  return (
    <div>
      <Heading title="Commentaire sur l'article " atr=" text-blue-700" />
      <div className="text-sm mt-2">
        {product.reviews &&
          product.reviews.map((review, index) => {
            return (
              <div key={review.reviewerName} className="max-w-[300px]">
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar className="text-7xl text-orange-500 rounded-full w-8 h-8 bg-gray-200 shadow-lg font-bold flex justify-center items-center">
                      {/* <AvatarImage
                        src={review.user.picture}
                        alt={review.user.firstname}
                        className="object-cover"
                      /> */}
                      <AvatarFallback>
                        <span className="text-base flex" >
                          {review.reviewerName.split(" ")[0][0]}{" "}
                          {review.reviewerName.split(" ")[1][0]}
                        </span>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="font-bold text-orange-500">
                    {review.reviewerName.split(" ")[0]}
                    {review.reviewerName.split(" ")[1]}
                  </div>
                  <div>{moment(review.date).fromNow()}</div>
                </div>
                <div className="mt-2">
                  <Rating value={review.rating} readOnly />
                  <div className="ml-2">{review.comment}</div>
                  <hr className="mt-4 mb-4 " />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListRating;
