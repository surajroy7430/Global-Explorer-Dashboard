import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden card-hover">
      {article.urlToImage && (
        <div className="h-48 overflow-hidden">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar size={14} />
          <span>{formatDate(article.publishedAt)}</span>
          <span className="mx-2">•</span>
          <span className="font-medium">{article.source.name}</span>
        </div>
        <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.description}
        </p>
        <Button variant="outline" size="sm" asChild>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read More <ExternalLink className="ml-2" size={14} />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
