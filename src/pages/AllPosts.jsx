import React, { useState, useEffect } from "react";
import { Container, Postcard } from "../components/index";
import service from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getAllActivePosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  return (
    <div className="py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard></Postcard>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
