import React, { useEffect, useState } from 'react';
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
import './Accessories.css';

const Accessories = () => {
  const { selectedBrand } = useParams();
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    // Fetch accessory data from your API
    const fetchAccessories = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/654f23c6-f657-4ba2-8312-b873c410b4ce');
        setAccessories(response.data);
      } catch (error) {
        console.error('Error fetching accessory data:', error);
      }
    };

    fetchAccessories();
  }, []);

  const filteredAccessories = accessories.filter((accessory) => accessory.brand === selectedBrand);

  return (
    <div>
      <h1>Accessories for {selectedBrand}</h1>
      <ImageList cols={3} gap={16}>
        {filteredAccessories.map((accessory) => (
          <ImageListItem key={accessory.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={accessory.name}
                  height="140"
                  image={accessory.imageUrl}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {accessory.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Price: ${accessory.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {accessory.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default Accessories;

