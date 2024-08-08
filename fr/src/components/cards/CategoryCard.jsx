import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Button, CardContent, CardHeader, Typography } from "@mui/material";
import useKellerCall from "../../hooks/useKellerCall";
import { btnStyle, flex } from "../../styles/globalStyle";

import axios from 'axios';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";





const CategoryCard = ({ category, name, handleOpen, setInfo, setCategory, }) => {
  const { deleteKellerData, getKellerData } = useKellerCall();




  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    //Api den resim vermezlerse bizde unsplash.com dan katedori adlarina göre resim cekeriz. burda önemli nokta {category?.name} degil {category.name} olacak. soru isaretsiz
    const fetchImage = async () => {
      try {
        const url = `https://api.unsplash.com/search/photos?page=1&query=${category.name}&client_id=IFdaiwFQ0uMZwS_z7iqEujMYjV7ThTxZuhTjkjgkXMw`;
        // console.log("Fetching image for category:", category?.name, "with URL:", url);
        const response = await axios.get(url);
        // console.log("Response from Unsplash:", response);
        setImageUrl(response.data.results[0].urls.small);
      } catch (error) {
        // console.error('Failed to fetch image from Unsplash', error);
      }
    };

    fetchImage();
  }, [category]);


  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAdmin = useSelector((state) => state.auth.isAdmin);


  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        height: "400px",
        display: "flex",
        flexDirection: "column",
      }}>

      <CardContent>

        <Typography gutterBottom variant="h5" component="div">
          {category.name}
        </Typography>

      </CardContent>

      <CardMedia
        image={imageUrl}
        sx={{ p: 0.1, objectFit: "contain", height: "210px" }}
        component="img"
        alt={category.name}
        title={category.name}
      />

      <CardActions sx={flex}>


        {isAdmin && (<EditIcon
          sx={btnStyle}
          onClick={() => {
            setInfo(category);
            handleOpen();
          }}
        />
        )}

        {isAdmin && (<DeleteOutlineIcon
          sx={btnStyle}
          onClick={() => deleteKellerData("categories", category._id)}
        />
        )}


        {/* <Button variant="contained"
          sx={{ textTransform: 'none' }}
          onClick={() => {
            getStockData("categories", category._id);
            console.log(category._id)
          
        }}>
          <Typography variant="body2">Category Blogs</Typography>

          <Blogs
            // open3={open3}
            // handleClose3={handleClose3}
            // category._id={category._id}
          />
        </Button> */}

        <Button variant="contained"
          sx={{ textTransform: 'none' }}
          component={Link}
          to={`/keller/ads/categoryId/${category._id}`}

        >
          <Typography variant="body2">Category Ads</Typography>
        </Button>


      </CardActions>
    </Card>
  );
};

export default CategoryCard;
