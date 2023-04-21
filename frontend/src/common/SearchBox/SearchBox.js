import React from 'react'
import { TextField } from '@mui/material'

function SearchBox ({ sea,onChange }) {
  
  return (
        <>
            <TextField
                id="standard-search"
                className="ml-auto p-2 "
                label="Search"
                type="search"
                variant="standard"
                value={sea}
                sx={{
                  label: {
                    color: '#252825',
                    marginLeft:'7px',
                      marginTop:'18px'
                  },
                  '.MuiInput-root:after': {
                    borderBottom: '2px solid #252825'
                  },
                  '.MuiInput-root:before': {
                    borderBottom: '2px solid #252825'
                  },
                  '.MuiInput-root.before:hover': {
                    borderBottom: '2px solid #252825'
                  },
                  '.MuiOutlinedInput-root': {
                    color: '#252825 '
                  },
                  '.MuiInputLabel-root.Mui-focused': {
                    color: '#252825'
                  },
                  '.MuiInput-root': {
                    color: '#252825',
                    marginTop:'16px'
                  },
                 
                  '.MuiInput-underline': {
                    borderBottom: '1px solid #F7F7F7',
                    marginRight:'6px'
                  }
                }}
                style={{
                  boxShadow: 'none',
                  width: '155px',
                  height: '48px',
                  // marginTop: '1%',
                   marginLeft: '58%',
                  borderRadius: '18px'
                }}
                onChange = {onChange}
            />
        </>
  )
}

export default SearchBox
