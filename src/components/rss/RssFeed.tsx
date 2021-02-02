import moment from 'moment';
import * as React from 'react';
import Parser from 'rss-parser';
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
                item: ['description']
            }
        });
        parser.parseURL("http://localhost:8080/https://www.svd.se/?service=rss", (err, res) => {
            if (err) {
                console.log(err);
            }
            else {
                let items = res.items.map(item => ({
                    title: item.title,
                    description: item.description,
                    date: capitalize(moment(item.pubDate).format("ddd Do MMM YYYY HH:mm")),
                    link: item.link,
                    feedImage: res.image?.url,
                    feedImageAlt: res.image?.title
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
            <div className="row">
                <div className="col-8 mx-auto">
                    <Spinner isLoading={isLoading}>
                        {
                            feed.map(item => 
                                <RssFeedItem {...item} />
                            )
                        }
                    </Spinner>
                </div>
            </div>
        </div>
    );
}