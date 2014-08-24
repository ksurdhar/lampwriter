class Note < ActiveRecord::Base
  belongs_to :user
  before_save :set_html_body

  def set_html_body
    if self.body
      self.html_body = body.gsub(/\n/, '<br/>')
    end
  end
end
