# React Redux Basic Blog App

This is a basic blog app built using React and Redux. It allows users to create posts with titles, content, and authors. Posts can be reacted to with reaction buttons, and the count increases upon clicking. The app also includes the ability to select an author, with "Unknown" as a fallback if no author is selected. The "Save Post" button is disabled until the title, content, and author fields are filled.

![Blog App Preview](https://github.com/nishanthan-k/react-redux-blog/blob/main/public/screenshots/blog-preview.png "Blog App Preview")

## Features

- Create new posts with titles, content, and authors
- Reaction buttons with count increaser
- Ability to select an author, with "Unknown" as a fallback
- "Save Post" button is disabled until all required fields are filled
- Posts are sorted by the time they are posted, with the newest on top
- Uses date-fns for date features

## Technologies Used

- React
- Redux
- date-fns
- Tailwind CSS

## Getting Started

1. Clone this repository.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Run the development server with `npm run dev`.
5. Access the app in your browser at `http://localhost:5173`.

## Usage

1. Fill out the title, content, and author fields.
2. Optionally, react to the post by clicking the reaction buttons.
3. Click the "Save Post" button to save your post.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
