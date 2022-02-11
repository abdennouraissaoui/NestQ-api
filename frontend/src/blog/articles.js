const articles = [
    {
      title: "Momentum and Markowitz: A Golden Combination (Paper review)",
      date: "2020-10-20",
      imageUrl:
        "https://i.ibb.co/rQHBZtK/markowitz-momentum.png",
      imageAltText: "Momentum",
      link:
        "https://www.linkedin.com/pulse/momentum-markowitz-golden-combination-paper-review-abdennour-aissaoui/",
    },
    {
      title: "Portfolio Optimization Using A Biased Covariance Matrix",
      date: "2020-07-14",
      imageUrl:
        "https://i.ibb.co/XWZVvdh/biased-cov-matrix.png",
      imageAltText: "Forecasting volatility",
      link:
        "https://www.linkedin.com/pulse/portfolio-optimization-using-biased-covariance-matrix-aissaoui",
    },
    {
      title: "Can Past Volatility Be Indicative of Future Volatility?",
      date: "2020-07-07",
      imageUrl:
        "https://i.ibb.co/C08qVcb/volatility-forecast.png",
      imageAltText: "Forecasting volatility",
      link:
        "https://www.linkedin.com/pulse/can-past-volatility-indicative-future-python-code-abdennour-aissaoui/",
    },
    {
      title: "4 Lessons Learned on Portfolio Optimization",
      date: "2020-06-29",
      imageUrl:
        "https://i.ibb.co/T0hh3Nk/portfolio-opt.png",
      imageAltText: "Efficient Frontier",
      link:
        "https://www.linkedin.com/pulse/4-lessons-learned-portfolio-optimization-abdennour-aissaoui/",
    },
    {
      title: "Dual Momentum: Pre- and post-publication performance",
      date: "2021-02-17",
      imageUrl:
        "https://i.ibb.co/MGH414x/dual-momentum.png",
      imageAltText: "Dual Momentum",
      link:
        "https://www.linkedin.com/pulse/dual-momentum-pre-post-publication-performance-abdennour-aissaoui/",
    },
  ];

  articles.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  });

export default articles;