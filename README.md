<label
  htmlFor="icon-button-file"
  style={{
    border: "1px solid red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
  <label htmlFor="image" style={{ display: "block" }}>
    Click profile image to select new image and then click cloud upload
  </label>
  <Typography
    variant="h6"
    sx={{
      display: "block",
      border: "1px solid green",
      textAlign: "center",
    }}
  >
    <span style={{ color: "green" }}>@{user.username}</span>
  </Typography>
  {/* Current Avatar Icon */}
  <Input
    accept="image/*"
    id="icon-button-file"
    type="file"
    sx={{ color: "red" }}
    name="avatar"
    onChange={(e) => {
      console.log("e.target.files", e.target.files);
      setSelectedImages(e.target.files[0]);
    }}
  />
  {/*upload to cloud icon */}
  <IconButton color="primary" aria-label="upload picture" component="span">
    <Avatar
      src={user.avatar}
      // src="https://i.pravatar.cc/300"
      sx={{ border: "1px solid red", margin: "0 auto" }}
    />
  </IconButton>

  {/* only need to show this if a photo is uploaded */}

  <div
    style={{
      border: "1px solid green",
      display: "flex",
      justifyContent: "center",
    }}
  >
    {uploadPhoto && (
      <Image
        cloudName="dcvh93esc"
        publicId={`${uploadPhoto}`}
        height="120px"
        width="120px"
      />
    )}
    {/* button to upload image to Cloud */}

    <CloudUploadIcon
      color="otherColor"
      sx={{ fontSize: 50, cursor: "pointer" }}
      onClick={() => {
        uploadImage();
      }}
    />
  </div>

  <button onClick={() => handlePhotoSubmit()}>SUBMIT PHOTO</button>
</label>;

<div style={{ color: "white", padding: "15px" }}>
            <h3>
              First_Name:
              <span style={{ color: "orange",fontSize: "15px" }}>
                {" "}
                {user.first_name}
              </span>
            </h3>
            <h3>
              Last_Name:
              <span style={{ color: "orange" , fontSize: "15px"}}> {user.last_name}</span>
            </h3>
            <h3>
              DOB: <span style={{ color: "orange" , fontSize: "15px"}}>{user.dob}</span>
            </h3>
            <h3>
              Email: <span style={{ color: "orange" , fontSize: "15px"}}>{user.email}</span>
            </h3>
            <h3>
              Username:<span style={{ color: "orange" , fontSize: "15px"}}> {user.username}</span>
            </h3>
            <h3>
              Role: <span style={{ color: "orange" , fontSize: "15px"}}>{user.role}</span>
            </h3>
            <h3>
              Dark_Mode:
              <span style={{ color: "orange" , fontSize: "15px"}}>
                {" "}
                {user.dark_mode ? "true" : "false"}
              </span>
            </h3>
            <h3>
              About_You:
              <span style={{ color: "orange" , fontSize: "15px"}}> {user.about_you}</span>
            </h3>
            Avatar{" "}
            {user.avatar && (
              <img src={user.avatar} alt="avatar" height="100px" />
            )}
          </div>