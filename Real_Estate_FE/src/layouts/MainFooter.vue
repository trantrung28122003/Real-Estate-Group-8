<template>
  <div class="footer">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5>About Us</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse euismod lectus sit amet lacus lacinia, et fringilla libero aliquet. Vestibulum eget lectus vitae ex placerat aliquam. </p>
        </div>
        <div class="col-md-3">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div class="col-md-3">
          <h5>Contact</h5>
          <ul class="list-unstyled">
            <li>123 Street, City</li>
            <li>contact@example.com</li>
            <li>(123) 456-7890</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
.footer {
  background-color: #f2f2f2;
  padding: 20px 0;
  /* margin-top: 20px; */
  text-align: center;
  /* width: 100%; */
}

.footer h5 {    
  font-weight: bold;
}

.footer ul {
  padding: 0;
  list-style: none;
  margin-top: 10px;
}

.footer ul li {
  margin-bottom: 5px;
}

.footer a {
  color: #333;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}
</style>