import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button, FormControl, TextField } from "@material-ui/core";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40%",
  },
  inputs: {
    width: "60%",
    margin: "0 auto",
    marginBottom: "20px",
    height: "10%",
  },
  buttons: {
    width: "60%",
    margin: "0 auto",
    marginBottom: "20px",
  },
  formControl: {
    minWidth: "100%",
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    quantity: "",
    images: [],
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setProductDetails({
      name: "",
      price: "",
      quantity: "",
      images: [],
    });
    setOpen(false);
  };

  const handleChange = (event) => {
    const { value, name, files } = event.target;
    switch (name) {
      case "name":
        setProductDetails({
          ...productDetails,
          name: value,
        });
        break;

      case "price":
        setProductDetails({
          ...productDetails,
          price: value !== "" ? +value : "",
        });
        break;
      case "quantity":
        setProductDetails({
          ...productDetails,
          quantity: value !== "" ? +value : "",
        });
        break;
      case "image":
        if (files) {
          setProductDetails({
            ...productDetails,
            images: files ? [...productDetails.images, ...files] : [],
          });
        }

        break;
      default:
        setProductDetails({ ...productDetails });
    }
  };

  let { name, price, quantity } = productDetails;
  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlinedIcon />}
      >
        Add Product
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form style={{ textAlign: "center" }}>
              <h2>Add Product</h2>
              <FormControl className={classes.formControl}>
                <TextField
                  type="text"
                  className={classes.inputs}
                  variant="outlined"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  type="number"
                  className={classes.inputs}
                  variant="outlined"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TextField
                  type="number"
                  className={classes.inputs}
                  variant="outlined"
                  label="Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={handleChange}
                  required
                />
              </FormControl>

              <TextField
                type="file"
                name="image"
                className={classes.inputs}
                variant="outlined"
                onChange={handleChange}
                inputProps={{ multiple: true }}
                accept="image/x-png,image/gif,image/jpeg"
                required
              />

              <FormControl className={classes.formControl}>
                <Button
                  type="submit"
                  className={classes.buttons}
                  onClick={handleOpen}
                  color="primary"
                  variant="contained"
                >
                  Add
                </Button>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Button
                  className={classes.buttons}
                  onClick={handleClose}
                  color="secondary"
                  variant="contained"
                >
                  Cancel
                </Button>
              </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
