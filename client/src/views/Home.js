function Home() {
  return (
    <div className="container mx-auto mt-12 mb-16">
      <h3 className="text-3xl">About Poke Proj</h3>
      
      <p className="mb-4">
        An app which lists all pokemon in the list view, Using React with Hooks and tailwind CSS on the front end, Using express with redis caching on the backend
      </p>
      
      <h3 className="text-xl">Todos</h3>

      <ul className="list-disc mb-4 ml-8">
        <li>Add more filters / different seatch pages i.e. search by Abilities etc</li>
        <li>Likely add routing to url so we can deep nest links, will require slight restructure to do this</li>
        <li>Add auto updating, i.e. click filter it will auto filter, same with show per page etc</li>
        <li>Add search</li>
        <li>Set up DB for users to log in / out</li>
        <li>Add functionality for users to save / view their pokemon</li>
        <li>Add more info to Pokemon specific page i.e. evolution chains, habitats etc</li>
      </ul>

      <p className="mb-4">
        Vivamus quis molestie risus. Ut vitae rhoncus turpis. Aliquam orci elit, commodo in varius vel, fermentum efficitur odio. Cras consectetur, nibh a luctus mollis, diam lacus laoreet nisi, ac suscipit tortor est ut massa. Morbi dignissim a est sit amet venenatis. Ut aliquam purus a justo dignissim, ut accumsan dui hendrerit. Mauris turpis turpis, ornare id nibh nec, placerat vehicula ex. Donec lobortis consectetur feugiat. Aliquam sit amet hendrerit sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam pellentesque mi velit, at tempor urna lobortis vitae. Sed eu vulputate turpis, eget elementum nunc.
      </p>
      
      <p className="mb-4">
        Nam elementum lacinia ipsum sagittis vehicula. Vivamus euismod arcu nulla, vitae sollicitudin lorem sollicitudin eu. Fusce sapien nulla, hendrerit vitae purus at, iaculis faucibus arcu. Vivamus urna est, ultrices non fringilla id, pharetra et risus. Duis dapibus rutrum massa eget molestie. Ut enim tortor, ullamcorper euismod diam a, vehicula tempor quam. Nunc sed urna a urna luctus varius eu quis purus. Integer porta consequat quam sit amet luctus. Mauris luctus quis sem ut efficitur. Mauris sit amet hendrerit purus. Ut volutpat felis id mauris ultrices consequat. Nam sed lacinia felis, a semper nibh. Curabitur feugiat lacus erat, quis pretium justo euismod eu.
      </p>
      
      <p className="mb-4">
        Duis finibus felis id lorem iaculis, a ultricies elit finibus. Nullam sodales purus et lacus ornare bibendum. Nunc sit amet aliquam ex. Nullam ut vehicula ligula. Suspendisse non justo lectus. In in accumsan neque, vitae fringilla risus. Donec in felis a mi scelerisque gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet metus urna. Sed faucibus, purus sit amet pharetra tincidunt, tellus urna vestibulum metus, sed scelerisque turpis dolor vitae magna. Mauris leo ipsum, rutrum eget finibus eu, convallis quis velit.
      </p>
      
      <p className="mb-4">
        Etiam consectetur bibendum imperdiet. Cras facilisis augue et ornare bibendum. Duis rutrum risus sed aliquet venenatis. Donec lobortis nulla vulputate, volutpat massa nec, rutrum justo. Curabitur laoreet elit ligula, et volutpat turpis cursus ut. Sed ultricies leo nec massa euismod vestibulum. Donec molestie porttitor turpis ac pulvinar. Suspendisse a est elementum, congue mi tincidunt, laoreet lectus.
      </p>
    </div>
  )
}

export default Home