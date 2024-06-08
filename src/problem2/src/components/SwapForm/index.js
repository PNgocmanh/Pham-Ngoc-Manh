import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
  InputLabel,
  Stack,
  OutlinedInput,
  Box,
  FormHelperText,
  Select,
  CircularProgress,
} from "@mui/material";
import { getTokenPrices } from "../../services/currencyService";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./style.css";

const SwapForm = () => {
  const [tokenPrices, setTokenPrices] = useState({});
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTokenPrices = async () => {
      const prices = await getTokenPrices();
      setTokenPrices(prices);
    };

    fetchTokenPrices();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!fromCurrency) {
      newErrors.fromCurrency = "Please select";
    }
    if (!toCurrency) {
      newErrors.toCurrency = "Please select";
    }
    if (!amount) {
      newErrors.amount = "Please enter amount";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConvert = () => {
    if (validate() === true) {
      setSubmitting(true);
      setTimeout(() => {
        const result = (amount * fromCurrency) / toCurrency;
        setConvertedAmount(result.toFixed(2));
        setSubmitting(false);
      }, [2000]);
    }
  };

  const tokenOptions = Object.values(tokenPrices).map((token) => ({
    value: token.price,
    label: token.currency,
  }));

  return (
    <Container maxWidth="sm" className="swap-form">
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ marginBottom: 5 }}>
            Currency Swap
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack
                direction={"row"}
                spacing={1}
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Stack direction={"row"} spacing={4}>
                  <InputLabel sx={{ paddingTop: 2 }}>From</InputLabel>
                  <Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="fromCurrency"
                      value={fromCurrency}
                      onChange={(e) => setFromCurrency(e.target.value)}
                      sx={{
                        width: 140,
                      }}
                    >
                      {tokenOptions.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.fromCurrency && (
                      <FormHelperText error>
                        {errors.fromCurrency}
                      </FormHelperText>
                    )}
                  </Box>
                </Stack>
                <Box sx={{ paddingTop: 2 }}>
                  <ArrowForwardIcon />
                </Box>
                <Stack direction={"row"} spacing={4}>
                  <InputLabel sx={{ paddingTop: 2 }}>To</InputLabel>
                  <Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="toCurrency"
                      value={toCurrency}
                      onChange={(e) => setToCurrency(e.target.value)}
                      sx={{
                        width: 140,
                      }}
                    >
                      {tokenOptions.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.toCurrency && (
                      <FormHelperText error>{errors.toCurrency}</FormHelperText>
                    )}
                  </Box>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={1.5}>
                <InputLabel sx={{ paddingTop: 2 }}>Amount</InputLabel>
                <Box>
                  <OutlinedInput
                    id="amount"
                    type="number"
                    fullWidth
                    sx={{ width: 410 }}
                    value={amount}
                    placeholder="Enter amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  {errors.amount && (
                    <FormHelperText error>{errors.amount}</FormHelperText>
                  )}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={submitting}
                onClick={handleConvert}
              >
                Convert {submitting && <CircularProgress size={20} />}
              </Button>
            </Grid>
            {convertedAmount && (
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  You get: {convertedAmount} {""}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SwapForm;
