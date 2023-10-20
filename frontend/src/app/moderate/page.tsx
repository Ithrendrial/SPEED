"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { createTheme, ThemeProvider } from "@mui/material";
import StarRatings from "react-star-ratings";
import axios from "axios";
import RatingPopUp from "@/components/RatingPopUp";
import style from "../../styles/ModeratePage.module.css";

export function Moderate() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedClaim, setSelectedClaim] = useState<string>("");
  let claimIndex = 0;

  // Ratings Pop Up props //
  const [ratingOpen, setRatingOpen] = useState<Boolean>(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [originalRatingArray, setOriginalRatingArray] = useState<string[]>([]);
  const [claimIndexProp, setClaimIndexProp] = useState<string>("");

  function getArticleRatings(ratingsAsString: string): number {
    const ratingsArray = ratingsAsString.split(",");
    const numericRatings = ratingsArray.map((rating) => parseFloat(rating));

    if (numericRatings.length > 0) {
      const sum = numericRatings.reduce((total, rating) => total + rating, 0);
      return sum / numericRatings.length;
    } else {
      return 0;
    }
  }

  useEffect(() => {
    // Parse the query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const method = queryParams.get("method");
    const claim = queryParams.get("claim");

    setSelectedMethod(method || "");
    setSelectedClaim(claim || "");
  }, []);

  // Converts the date value into a string and formats it to display in dd MMM YYYY //
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  // Take all values retrieved from the database and save any that match the selected claim into a "filteredArticles" array. //
  // Only the filtered articles are passed into the table to be displayed.                                                   //
  const filteredArticles = useMemo(() => {
    if (!selectedClaim) {
      // If no claim is selected, return all articles
      return articles;
    }

    // Add articles containing the claim into filteredArticles array to add to the table data
    return articles.filter((article) => article.claim.includes(selectedClaim));
  }, [articles, selectedClaim]);

  const moderateOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id
  ) => {
    console.log("Edit button clicked");
    console.log("Selected: ", id);
    const queryParams = new URLSearchParams({ id });
    location.href = `http://localhost:3000/approval?${queryParams.toString()}`;
  };

  function getAll() {
    axios
      .get<Article[]>("http://localhost:3001/articles")
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        console.log("Error from Results");
      });
  }

  // Map elements in filtered articles into wanted format for the table and return the attributes displayed in the table, //
  // formatted correctly, into the appropriate columns.                                                                   //
  const data = filteredArticles.map((article) => {
    claimIndex = article.claim.indexOf(selectedClaim); // Find the index of selectedClaim in the claim array to use in other array types like support

    const source = // Take journal name, volume, and issue and format into the source, with variations in case volume, issue, or pages are missing
      (article.journal_name ? `${article.journal_name}` : "") +
      (article.volume
        ? (article.journal_name ? ", " : "") + `Vol. ${article.volume}`
        : "") +
      (article.issue && article.volume ? `(${article.issue}` : "") +
      (article.issue && article.volume && article.pages
        ? `), pg. ${article.pages}`
        : "");

    return {
      // Return table data
      title: article.title,
      authors: article.authors.join(", "),
      source: source,
      publication_date: formatDate(article.publication_date),
      doi: article.doi,
      claim: selectedClaim, // Use the selected claim
      research_type: claimIndex !== -1 ? article.research_type[claimIndex] : "", // Use the corresponding index if found
      participant_type:
        claimIndex !== -1 ? article.participant_type[claimIndex] : "", // Use the corresponding index if found
      support: claimIndex !== -1 ? article.support[claimIndex] : "", // Use the corresponding index if found
      summary: article.summary,
      rating: (
        <div>
          {claimIndex !== -1 && article.rating && article.rating[claimIndex] ? (
            <div className={style.rating}>
              <StarRatings
                rating={getArticleRatings(article.rating[claimIndex])}
                starDimension="1.2rem"
                starSpacing="0.1rem"
                starRatedColor="rgb(238, 198, 31)"
              />
            </div>
          ) : (
            <StarRatings
              rating={0}
              starDimension="1.2rem"
              starSpacing="0.1rem"
            />
          )}

          <div
            className={style.add_rating}
            id={claimIndex.toString()}
            onClick={(e) => {
              setSelectedArticleId(article.articleId);
              setClaimIndexProp(e.currentTarget.id);
              setOriginalRatingArray(article.rating);
              setRatingOpen(true);
            }}
          >
            Add Rating
          </div>
        </div>
      ),
      moderate: (
        <div
          className={style.moderate}
          onClick={(e) => {
            moderateOnClick(e, article.articleId);
          }}
        >
          <a>Moderate</a>
        </div>
      ),
    };
  });

  // Table header keys, text value, and style props //
  const columns = useMemo(
    () => [
      {
        accessorKey: "moderate",
        header: "Moderate",
        size: 200,
        muiTableBodyCellProps: {
          sx: {
            textAlign: "right", // Title data cells are aligned left, against the default center
          },
        },
      },
      {
        accessorKey: "title",
        header: "Title",
        size: 200,
        muiTableBodyCellProps: {
          sx: {
            textAlign: "left", // Title data cells are aligned left, against the default center
          },
        },
      },
      {
        accessorKey: "authors",
        header: "Authors",
        size: 150,
        muiTableBodyCellProps: {
          sx: {
            textAlign: "left", // Authors data cells are aligned left, against the default center
          },
        },
      },
      {
        accessorKey: "source",
        header: "Source",
        size: 200,
      },
      {
        accessorKey: "publication_date",
        header: "Publication Date",
        size: 50,
      },
      {
        accessorKey: "doi",
        header: "DOI",
        size: 250,
      },
      {
        accessorKey: "claim",
        header: "Claim",
        size: 150,
      },
      {
        accessorKey: "research_type",
        header: "Research Type",
        size: 200,
      },
      {
        accessorKey: "participant_type",
        header: "Participant Type",
        size: 200,
      },
      {
        accessorKey: "support",
        header: "Evidence",
        size: 150,
      },
      {
        accessorKey: "rating",
        header: "Rating",
        size: 150,
      },
    ],
    []
  );

  // Retrieve data from the database //
  useEffect(() => {
    const moderator_status = "unmoderated";
    const url = `http://localhost:3001/articles/retrieve/unmoderated?moderator_status=${moderator_status}`;
    axios
      .get<Article[]>(url)
      .then((res) => {
        console.log(res.data);
        setArticles(res.data); // Create Article objects with data retrieved
      })
      .catch(() => {
        console.log("Error from Results"); // Catch if there is an error reading from the database
      });
  }, []);

  // Table styling //
  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          background: {
            default: "#E5E7DE", // Table background colour
          },
        },
        components: {
          MuiSwitch: {
            styleOverrides: {
              switchBase: {
                color: "#334C1F", // Colour of unchecked toggle thumb
                "&.Mui-checked": {
                  color: "#6E8C30", // Colour of checked toggle thumb
                },
                "&.Mui-checked.Mui-disabled": {
                  // Styles of disabled, checked toggle thumb for expand column
                  color: "#6E8C30",
                  opacity: "0.2",
                },

                "&.Mui-checked+.MuiSwitch-track": {
                  backgroundColor: "#6E8C30", // Track colour for checked toggle
                },
              },

              track: {
                backgroundColor: "#1b3600", // Track colour for unchecked toggle
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              textPrimary: {
                color: "#334C1F", // Colour of button text (Hide/show all)
              },
            },
          },
          MuiSvgIcon: {
            styleOverrides: {
              root: {
                color: "#334C1F", // Colour of button icons
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              body1: {
                "&.Mui-disabled": {
                  // Colour of disabled button text, for expand column label
                  opacity: "0.5",
                },
              },
            },
          },
        },
      }),
    []
  );

  const backgroundPressed = () => {
    setRatingOpen(false);
  };

  return (
    <div className={style.page}>
      <button onClick={getAll}>Get All</button>
      <div className="heading">UNMODERATED ARTICLES</div>
      {ratingOpen ? (
        <RatingPopUp
          backgroundPressed={() => backgroundPressed()}
          articleId={selectedArticleId}
          originalRatingArray={originalRatingArray}
          claimIndex={claimIndexProp}
        />
      ) : null}
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          columns={columns} // Define table columns
          data={data} // Pass in table data
          enableDensityToggle={false} // Remove the ability to change table density (row padding)
          enableTableFooter={false} // Remove table footer
          enableFullScreenToggle={false} // Remove ability to set full screen
          enableGlobalFilter={false} // Remove search function
          enableExpandAll={false} // Remove ability to expand all rows at once
          paginateExpandedRows={false} // Remove summary from being counted as an extra row for pagination
          enableColumnActions={false} // Remove column header menus
          enableSorting={false} // Remove column sorting
          enablePagination={false} // Remove pagination
          muiTableHeadCellProps={{
            // Styling for table header cells
            sx: {
              "& .Mui-TableHeadCell-Content": {
                display: "flex",
                justifyContent: "center",
                fontFamily: "LexendExa-SemiBold, sans-serif",
                color: "#334C1F",
                letterSpacing: "min(0.1vw, 0.2vh)",
                fontWeight: "700",
                fontSize: "1rem",
                alignText: "center",
                height: "min(10vw, 4vh)",
              },
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              textAlign: "center", // Center text inside table data cells
            },
          }}
          displayColumnDefOptions={{
            "mrt-row-expand": {
              muiTableHeadCellProps: {
                // Styling for expanded row header
                sx: {
                  color: "#E5E7DE",
                  fontSize: "0.1px",
                },
              },
            },
          }}
          muiTablePaperProps={{
            elevation: 0, // Removes table box shadow
            sx: {
              height: "70vh",
              margin: "0",
              background: "#E5E7DE", // Changing styling for table wrapper
            },
          }}
          muiTableDetailPanelProps={{
            sx: {
              background: "#E5E7DE", // Background colour of expanded row (for summary)
            },
          }}
          renderDetailPanel={(
            { row } // Content of expanded row (for summary) as a jsx component
          ) => (
            <div className={style.details}>
              <div className={style.subheading}>Summary </div>
              <div className={style.content}>
                {row.original.summary[claimIndex]}
              </div>
            </div>
          )}
        ></MaterialReactTable>
      </ThemeProvider>
    </div>
  );
}

export default Moderate;
