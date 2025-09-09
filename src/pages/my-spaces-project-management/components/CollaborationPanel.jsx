import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CollaborationPanel = ({ 
  collaborators, 
  comments, 
  onInviteCollaborator, 
  onRemoveCollaborator, 
  onAddComment,
  onResolveComment 
}) => {
  const [newCollaboratorEmail, setNewCollaboratorEmail] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showInviteForm, setShowInviteForm] = useState(false);

  const handleInvite = (e) => {
    e?.preventDefault();
    if (newCollaboratorEmail?.trim()) {
      onInviteCollaborator(newCollaboratorEmail);
      setNewCollaboratorEmail('');
      setShowInviteForm(false);
    }
  };

  const handleAddComment = (e) => {
    e?.preventDefault();
    if (newComment?.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const getPermissionColor = (permission) => {
    switch (permission) {
      case 'owner':
        return 'text-accent bg-accent/10 border-accent/20';
      case 'editor':
        return 'text-success bg-success/10 border-success/20';
      case 'viewer':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="spatial-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Collaboration</h3>
            <p className="text-sm text-text-secondary">
              {collaborators?.length} collaborator{collaborators?.length !== 1 ? 's' : ''} • {comments?.filter(c => !c?.resolved)?.length} active comments
            </p>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
          onClick={() => setShowInviteForm(!showInviteForm)}
        >
          Invite
        </Button>
      </div>
      {/* Invite Form */}
      {showInviteForm && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
          <form onSubmit={handleInvite} className="space-y-4">
            <Input
              type="email"
              label="Invite Collaborator"
              placeholder="Enter email address"
              value={newCollaboratorEmail}
              onChange={(e) => setNewCollaboratorEmail(e?.target?.value)}
              required
            />
            <div className="flex items-center justify-end space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowInviteForm(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                size="sm"
                iconName="Send"
                iconPosition="left"
              >
                Send Invite
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Collaborators List */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Team Members</h4>
        <div className="space-y-3">
          {collaborators?.map((collaborator) => (
            <div key={collaborator?.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Image
                  src={collaborator?.avatar}
                  alt={collaborator?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-text-primary">{collaborator?.name}</div>
                  <div className="text-sm text-text-secondary">{collaborator?.email}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getPermissionColor(collaborator?.permission)}`}>
                  {collaborator?.permission?.charAt(0)?.toUpperCase() + collaborator?.permission?.slice(1)}
                </div>
                
                {collaborator?.permission !== 'owner' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="X"
                    onClick={() => onRemoveCollaborator(collaborator?.id)}
                    className="text-text-secondary hover:text-error"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comments Section */}
      <div>
        <h4 className="font-medium text-text-primary mb-3">Comments & Feedback</h4>
        
        {/* Add Comment Form */}
        <form onSubmit={handleAddComment} className="mb-4">
          <div className="flex space-x-3">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Add a comment or suggestion..."
                value={newComment}
                onChange={(e) => setNewComment(e?.target?.value)}
                className="mb-2"
              />
              <div className="flex items-center justify-end space-x-2">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  iconName="Send"
                  iconPosition="left"
                  disabled={!newComment?.trim()}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {comments?.map((comment) => (
            <div key={comment?.id} className={`flex space-x-3 p-3 rounded-lg ${
              comment?.resolved ? 'bg-success/5 border border-success/20' : 'bg-background border border-border'
            }`}>
              <Image
                src={comment?.author?.avatar}
                alt={comment?.author?.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-text-primary text-sm">{comment?.author?.name}</span>
                    <span className="text-xs text-text-secondary">{formatTimeAgo(comment?.createdAt)}</span>
                  </div>
                  
                  {!comment?.resolved && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Check"
                      onClick={() => onResolveComment(comment?.id)}
                      className="text-success hover:bg-success/10"
                    >
                      Resolve
                    </Button>
                  )}
                </div>
                
                <p className="text-sm text-text-primary mb-2">{comment?.content}</p>
                
                {comment?.attachedTo && (
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <Icon name="Package" size={12} />
                    <span>On: {comment?.attachedTo}</span>
                  </div>
                )}
                
                {comment?.resolved && (
                  <div className="flex items-center space-x-1 text-xs text-success mt-2">
                    <Icon name="CheckCircle" size={12} />
                    <span>Resolved</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Collaboration Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-accent">{collaborators?.length}</div>
            <div className="text-xs text-text-secondary">Team Members</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-warning">{comments?.filter(c => !c?.resolved)?.length}</div>
            <div className="text-xs text-text-secondary">Open Comments</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-success">{comments?.filter(c => c?.resolved)?.length}</div>
            <div className="text-xs text-text-secondary">Resolved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationPanel;