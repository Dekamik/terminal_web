import * as React from 'react';
import Parser from 'rss-parser';
import { getDateStr, getTimeStr } from '../../helpers/DateHelper';
import { capitalize } from '../../helpers/StringHelper';
import { Spinner } from '../common/Spinner';
import { IRssFeedItem, RssFeedItem } from './RssFeedItem';

interface IRssFeed {

}

export const RssFeed: React.FunctionComponent<IRssFeed> = (props) => {

    const [feed, setFeed] = React.useState<IRssFeedItem[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fetchRss = React.useCallback(() => {
        setIsLoading(true);

        let parser = new Parser({
            customFields: {
                item: ['description', 'category']
            }
        });

        parser.parseURL("http://localhost:8080/https://www.svd.se/?service=rss", (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                let items = res.items.map((item, i) => ({
                    id: i,
                    title: item.title,
                    description: item.description,
                    date: capitalize(`${getDateStr(new Date(Date.parse(item.pubDate ?? "")))} kl. ${getTimeStr(new Date(Date.parse(item.pubDate ?? "")))}`),
                    link: item.link,
                    feedImage: res.image?.url,
                    feedImageAlt: res.image?.title,
                    category: item.category
                }));
                setFeed(items);
            }
            setIsLoading(false);
        });
    }, []);

    React.useEffect(() => {
        fetchRss();
    }, [fetchRss]);

    return (
        <div className="col-12">
            <div className="row">
                <h1 className="mx-auto">RSS-flöde</h1>
            </div>
            <hr/>
            <div className="row">
                <div className="col-8 mx-auto">
                    <Spinner isLoading={isLoading}>
                        {
                            feed.map((item, i) => 
                                <RssFeedItem {...item} key={i} />
                            )
                        }
                    </Spinner>
                </div>
            </div>
        </div>
    );
}