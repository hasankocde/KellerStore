import { useEffect, useState } from "react";
import useKellerCall from "../hooks/useKellerCall";
import Typography from "@mui/material/Typography";
import { Button, Container, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CategoriesModal from "../components/modals/CategoriesModal";
import loadingGif from "../assets/loading.gif";

import PageHeader from "../components/PageHeader";
import CategoryCard from "../components/cards/CategoryCard";







const Categories = () => {
  const { getKellerkData } = useKellerCall();
  const { categories, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      name: "",

    });
    //* handleClose olduğunda yani modal kapnadığında formdaki verilerin temizlenmesi için burada tanımladık.
  };

  const [category, setCategory] = useState(null);

  const [info, setInfo] = useState({
    name: "",

  });

  useEffect(() => {
    getKellerData("categories");
  }, []);
  // console.log(categories)
  return (
    <Container maxWidth={"xl"}>
      {/* <Typography  align="center"
        variant="h4"
        component={"h1"}
        color={"secondary.second"} mb={3}>
        Categories
      </Typography> */}
      <PageHeader text="Categories" />
      {/* <Button variant="contained" onClick={() => setOpen(true)}>
        New Category
      </Button> */}
      {/* <CategoriesModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      /> */}
      <Grid container justifyContent={"center"} spacing={2} mt={3}>
        {/* stock ta oluşturduğumuz loading stateini bu şekilde kullanabiliriz. */}
        {loading ? (
          <img src={loadingGif} alt="loading..." height={500} />
        ) : (
          categories?.map((category) => (
            <Grid item xs={12} md={6} lg={4} xl={3} key={category._id}>
              <CategoryCard
                // {...category}
                // handleOpen={handleOpen}
                // setInfo={setInfo}
                
                category={category} // ... li yapmama mizin nedeni category direkt gitsin diye
                handleOpen={handleOpen}
                setInfo={setInfo}

              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Categories;
