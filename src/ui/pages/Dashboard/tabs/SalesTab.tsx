import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import Button from "@mui/material/Button";
import { UserPlus, Building2 } from 'lucide-react';
import ApartmentIcon from "@mui/icons-material/Apartment";

export default function SalesTab() {
  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
    // You can add your search logic here
  };

  return (
    <Box>
      {/* saerch, add new member and add new org */}
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          m: 1,
          color: "white",
        }}
      >
        <Box
          sx={{
            m: 1,
            width: "60vw",
          }}
        >
          <SearchBar onSearch={handleSearch} />
        </Box>

        <Box sx={{ display: "flex", gap: 1 , marginRight:1 }}>
          <Button
            variant="contained" size="large"
            startIcon={<UserPlus />}
            sx={{
              backgroundColor: "#e6fff2",
              color: "green",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#d0f5e4",
              },
            }}
          >
            New Member
          </Button>
          <Button
            variant="contained" size="large"
            startIcon={<Building2 />}
            sx={{
              backgroundColor: "#e6f0ff",
              color: "blue",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#d0e4ff",
              },
            }}
          >
            New Organization
          </Button>
        </Box>
      </Box>

      <Grid>
        
      </Grid>
    </Box>
  );
}
