import { faSms } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DOMPurify from 'dompurify';
import * as React from 'react';

export interface IRssFeedItem {
    id: number;
    title?: string;
    description?: string;
    date?: string;
    link?: string;
    feedImage?: string;
    feedImageAlt?: string;
    category?: string;
}

export const RssFeedItem: React.FunctionComponent<IRssFeedItem> = (props) => {

    const detailsId = `details${props.id}`;

    const sendLink = () => {

    }

    return (
        <>
            <div key={props.id} className="card text-dark">
                <div className="card-header"
                    data-toggle="collapse"
                    data-target={`#${detailsId}`}
                    aria-expanded="false"
                    aria-controls={detailsId}>
                    <div className="row">
                        <div className="col-10">
                            <h5>
                                {props.title}
                            </h5>
                        </div>
                        <div className="col-2 text-right">
                            <img className="rss-thumbnail" src={props.feedImage} alt={props.feedImageAlt} />
                        </div>
                    </div>
                    <div className="row text-muted">
                        <div className="col-6">
                            {props.date}
                        </div>
                        <div className="col-6 text-right">
                            {props.category}
                        </div>
                    </div>
                </div>
                <div id={detailsId} className="collapse">
                    {
                        props.description !== undefined && props.description?.length !== 0
                            ? <div className="card-body">
                                <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(props.description) ?? ""}}>
        
                                </div>
                            </div>
                            : null
                    }
                    <div className="card-footer text-right">
                        <button className="btn btn-info btn-lg" onClick={sendLink} ><FontAwesomeIcon icon={faSms} /> Skicka länk</button>
                    </div>
                </div>
            </div>
            <hr/>
        </>
    );
}