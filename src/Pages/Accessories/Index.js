import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import './Index.css'; 

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const { brand } = useParams();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products/accessories');
        setAccessories(response.data);
      } catch (error) {
        console.error('Error fetching accessory data:', error);
      }
    };

    fetchAccessories();
  }, []);

  const filteredAccessories = accessories.filter((accessory) => accessory.brand === brand);

  return (
    <div className="accessories-container">
      <h1 className="accessories-heading">Accessories for {brand}</h1>
      <div className="accessories-list">
        <ImageList cols={4} gap={16}>
          {filteredAccessories.map((accessory) => (
            <ImageListItem key={accessory.id}>
              <Link to={`/accessories-description/${brand}/${accessory.model}`} className="accessory-link">
                <Card className="accessory-card">
                  <CardActionArea>
                  <div className="image-container">
                    <CardMedia
                      component="img"
                      alt={accessory.name}
                      height="200"
                      image={accessory.image}
                    />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {accessory.brand}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {accessory.model}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Price: <span className="accessory-price">Rs.{accessory.price}</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="accessories-buttons">
        <Link to="/order-summary" className="accessory-button">
          Skip to Order Summary
        </Link>
      </div>
    </div>
  );
};

export default Accessories;
