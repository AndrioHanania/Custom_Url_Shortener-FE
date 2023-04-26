import { observer } from 'mobx-react';
import { SetStateAction, useState } from 'react';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';

export const HomePage = observer(() => {
    const [fullUrl, setFullUrl] = useState("");
    const [tinyUrl, setTinyUrl] = useState("");
    const [statusCreateTinyUrl, setStatusCreateTinyUrl] = useState("");
    const [statusRedirectOriginalUrl, setStatusRedirectOriginalUrl] = useState("");

    const onClickCreateTinyUrl = async(event: any) => {
        setStatusCreateTinyUrl("");
        if(fullUrl.length !== 0){
            axios.post('http://localhost:3001/url/shortenUrl', {
                url: fullUrl
            })
            .then((response) => {
              if(response.data.err !== null)
              {
                console.log(response.data.err);
                setStatusCreateTinyUrl(response.data.err);
              }
              else
              {
                console.log(`tiny url: ${response.data.value}`);
                setStatusCreateTinyUrl(`<span>tiny url: <a href=${response.data.value} target="_blank">${response.data.value}</a></span>`);
              }
            })
            .catch((error) => {
              console.log(error.message);
              setStatusCreateTinyUrl(error.message);
            });
        }
        else
          setStatusCreateTinyUrl("param fullUrl is invalid");    
    };


    const onClickRedirectOriginalUrl = async(event: any) => {
      setStatusRedirectOriginalUrl("");
      if(tinyUrl.length !== 0){
        axios.post('http://localhost:3001/url/fullUrl', {
          url: tinyUrl
      })
      .then((response) => {
        if(response.data.err !== null)
        {
          console.log(response.data.err);
          setStatusCreateTinyUrl(response.data.err);
        }
        else
        {
          window.open(response.data.value, '_blank');
          console.log(`original url: ${response.data.value}`);
        }
        })
        .catch((error) => {
          console.log(error.message);
          setStatusCreateTinyUrl(error.message);
        });
      }
      else
        setStatusCreateTinyUrl("param tinyUrl is invalid");
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '50px' }}>
            <TextField
                margin="normal"
                fullWidth
                id="fullUrl"
                label="full url"
                name="fullUrl"
                autoComplete="fullUrl"
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => setFullUrl(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickCreateTinyUrl}
            >
              Create tiny url
            </Button>
            <Typography
              color="text.secondary"
              align="center"
              sx={{ mt: 8, mb: 4 }}
              style={{ marginTop: '10px' }}
              dangerouslySetInnerHTML={{ __html: statusCreateTinyUrl }}
            >
            </Typography>
            <Typography color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }} style={{ marginTop: '10px' }}>
                {"-----------------------------------------------------------------------"}
            </Typography>

            <TextField
                margin="normal"
                fullWidth
                id="TinyUrl"
                label="tiny url"
                name="TinyUrl"
                autoComplete="TinyUrl"
                onChange={(event: { target: { value: SetStateAction<string>; }; }) => setTinyUrl(event.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onClickRedirectOriginalUrl}
            >
              Redirect to original url
            </Button>
            <Typography color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }} style={{ marginTop: '10px' }}>
                {statusRedirectOriginalUrl}
            </Typography>
        </Container>
    );

});